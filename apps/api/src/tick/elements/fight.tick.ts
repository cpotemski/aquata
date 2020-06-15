import { TickData, TickElement } from '../tick';
import { FleetActionEnum, Ships } from '@aquata/api-interfaces';
import { FleetEntity } from '../../fleet/fleet.entity';
import { add, multiplyAndCeil, resetFleet, shipsAvailable } from '@aquata/helper';
import { shipData } from '@aquata/ship-data';

export class Fights {
  [userId: string]: {
    attackingFleets: FleetEntity[],
    defendingFleets: FleetEntity[],
    result: {
      attackerNames: string[];
      defenderNames: string[];
      attackingShips: Ships;
      defendingShips: Ships;
      attackerLostPercentage: number;
      defenderLostPercentage: number;
    }
  }
}

export class FightTick implements TickElement {
  name = 'fight';
  fights: Fights = {};

  tick({ fleets, stations, ...rest }: TickData) {
    this.fights = {};
    this.groupFightingFleetsToFights(fleets);

    this.calculateFights();

    this.updateFleetsAfterFight();

    this.generateFightReport();

    return {
      ...rest,
      stations,
      fleets,
      fights: this.fights
    };
  }

  private groupFightingFleetsToFights(fleets: FleetEntity[]) {
    const fightingFleets = fleets.filter(fleet => fleet.action && fleet.actionTicks > 0 && fleet.remainingTime < 1);

    fightingFleets.forEach(fleet => {
      if (!this.fights[fleet.target.id]) {
        this.fights[fleet.target.id] = {
          attackingFleets: [],
          defendingFleets: [],
          result: {
            attackerNames: [],
            defenderNames: [],
            attackingShips: {},
            defendingShips: {},
            attackerLostPercentage: 0,
            defenderLostPercentage: 0
          }
        };
      }

      const fight = this.fights[fleet.target.id];

      if (fleet.action === FleetActionEnum.ATTACK) {
        fight.attackingFleets.push(fleet);
      } else {
        fight.defendingFleets.push(fleet);
      }
    });

    // add available fleets from target to fight
    Object.keys(this.fights).forEach(userId => {
      const fleetsAtHome = fleets.filter(fleet => fleet.user.id === userId && !fleet.action && shipsAvailable(fleet));
      this.fights[userId].defendingFleets.push(...fleetsAtHome);
    });
  }

  calculateFights() {
    Object.keys(this.fights).forEach(targetId => {
      const fight = this.fights[targetId];

      const attackingShips = this.sumShipsFromFleets(fight.attackingFleets);
      const defendingShips = this.sumShipsFromFleets(fight.defendingFleets);


      const attackerData = this.calculateFleetData(attackingShips);
      const defenderData = this.calculateFleetData(defendingShips);

      const attacker = this.calculateFleetPower(attackerData);
      const defender = this.calculateFleetPower(defenderData);

      console.log('power', attacker, defender);

      fight.result.attackerNames = [].slice.call(fight.attackingFleets.map(fleet => fleet.user.name));
      fight.result.defenderNames = [].slice.call(fight.defendingFleets.map(fleet => fleet.user.name));
      fight.result.attackingShips = attackingShips;
      fight.result.defendingShips = defendingShips;
      fight.result.attackerLostPercentage = this.calculateDestructionPercentage(attacker.health, defender.firepower, defender.cannons, attacker.shipCount);
      fight.result.defenderLostPercentage = this.calculateDestructionPercentage(defender.health, attacker.firepower, attacker.cannons, defender.shipCount);
    });
  }

  private sumShipsFromFleets(fleets: FleetEntity[]): Ships {
    return fleets.map(fleet => fleet.ships).reduce((sum: Ships, ships) => add(sum, ships), {});
  }

  private calculateFleetData(ships: Ships) {
    return Object.keys(ships).map(shipName => {
      const shipSpecs = shipData.find(data => data.name === shipName);
      const shipCount = ships[shipName];
      return {
        cannons: shipSpecs.cannons,
        firepower: shipSpecs.firePower,
        health: shipSpecs.health,
        count: shipCount
      };
    });
  }

  private calculateFleetPower(power: { firepower: number; cannons: number; count: any; health: number }[]) {
    const shipCountSum = power.reduce((sum, { count }) => sum + count, 0);
    const cannonsSum = power.reduce((sum, { cannons, count }) => sum + (cannons * count), 0);
    const firepowerSum = power.reduce((sum, { cannons, firepower, count }) => sum + (cannons * firepower * count), 0);
    const healthSum = power.reduce((sum, { health }) => sum + health, 0);
    return { shipCount: shipCountSum, cannons: cannonsSum, firepower: firepowerSum, health: healthSum };
  }

  private calculateDestructionPercentage(enemyHealth: number, firepower: number, cannons: number, enemyShipCount) {
    if (enemyHealth <= firepower) {
      if (cannons < enemyShipCount) {
        console.log(`Not enough cannons to destroy all ships. Destroyed only ${cannons} of ${enemyShipCount} ships (${cannons / enemyShipCount * 100}%)`);
        return cannons / enemyShipCount;
      }
      console.log('enemy completely destroyed');
      return 1;
    }

    const healthAfterFight = enemyHealth - firepower;
    console.log(`defender lost ${(1 - healthAfterFight / enemyHealth) * 100}% of his fleet`);
    return 1 - healthAfterFight / enemyHealth;
  }

  private updateFleetsAfterFight() {
    Object.values(this.fights).forEach(fight => {
      fight.attackingFleets.forEach(fleet => {
        fleet.ships = multiplyAndCeil(fleet.ships, 1 - fight.result.attackerLostPercentage);
        this.resetFleetIfDestroyed(fleet);
        this.decrementActionTicksAndReturn(fleet);
      });
      fight.defendingFleets.forEach(fleet => {
        fleet.ships = multiplyAndCeil(fleet.ships, 1 - fight.result.defenderLostPercentage);
        this.resetFleetIfDestroyed(fleet);
        this.decrementActionTicksAndReturn(fleet);
      });
    });
  }


  private decrementActionTicksAndReturn(fleet: FleetEntity) {
    if (fleet.action) {
      fleet.actionTicks -= 1;

      // send fleet back home after fight
      if (fleet.actionTicks === 0) {
        fleet.remainingTime = fleet.travelTime;
        fleet.returning = true;
      }
    }
  }

  private generateFightReport() {
    Object.keys(this.fights).forEach(targetId => {
      const fight = this.fights[targetId];
      console.log(`Fight at user ${targetId}`);
      console.log(`Attackers: ${fight.result.attackerNames.join(' ')}`);
      console.log(fight.result.attackingShips);
      console.log(`Defenders: ${fight.result.defenderNames.join(' ')}`);
      console.log(fight.result.defendingShips);
      console.log(`Attackers lost ${fight.result.attackerLostPercentage * 100}% of their fleet`);
      console.log(`Defenders lost ${fight.result.defenderLostPercentage * 100}% of their fleet`);
    });
  }

  private resetFleetIfDestroyed(fleet: FleetEntity) {
    if (!shipsAvailable(fleet)) {
      fleet.ships = {};
      resetFleet(fleet);
    }
  }
}
