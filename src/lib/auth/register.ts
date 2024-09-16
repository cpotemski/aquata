import { db } from "@/lib/db";
import { auth } from "@/lib//auth";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { COORDINATES_MAX_X, COORDINATES_MAX_Y } from "@/lib/config";
import { redirect } from "next/navigation";
import CoordinateCreateInput = Prisma.CoordinateCreateInput;

const Input = z.object({
  username: z.string(),
  stationname: z.string()
})

export const register = async (formData: FormData) => {
  //TODO: error handling
  const { username, stationname } = Input.parse(Object.fromEntries(formData))

  //TODO: check if email already verified
  const session = await auth()
  const id = session?.user?.id
  const email = session?.user?.email
  if (!(id && email)) {
    throw "User not logged in but tries to register"
  }

  const defaultValues = await getUserDefaults(stationname)

  await db.user.update({ where: {id}, data: { name: username, ...defaultValues } })

  redirect("/game")
}

export const getUserDefaults = async (stationName: string) => ({
  station: {
    create: {
      name: stationName,
      resources: {
        create: {
          aluminium: 1000,
          steel: 1000,
          plutonium: 1000
        }
      },
      coordinates: {
        create: await findEmptyCoordinate()
      }
    }
  },
  fleets: {
    create: {
      resources: {
        create: {}
      },
      baseFleet: true
    }
  }
})

export const findEmptyCoordinate = async (): Promise<CoordinateCreateInput> => {
  let found = false
  let x: number
  let y: number
  do {
    x = Math.ceil(Math.random() * COORDINATES_MAX_X)
    y = Math.ceil(Math.random() * COORDINATES_MAX_Y)
    const existingCoordinate = await db.coordinate.findFirst({
      where: { x, y }
    })
    found = existingCoordinate === null
  } while (!found)

  return { x, y }
}
