import { NgModule } from '@angular/core';
import { PortalComponent } from './portal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PortalComponent],
  imports: [
    FormsModule
  ],
  exports: [PortalComponent]
})
export class PortalModule {}
