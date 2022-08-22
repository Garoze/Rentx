import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJSDateProvider } from "./DateProvider/impls/DayJSDateProvider";

container.registerSingleton<IDateProvider>(
  "DayJSDateProvider",
  DayJSDateProvider
);
