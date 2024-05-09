import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CategoryMenuService } from './service/CategoryMenu/categorymenu.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
