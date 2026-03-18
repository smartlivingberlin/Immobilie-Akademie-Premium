import { contentDataModule1Maximal as contentDataModule1Maximalist } from "../pages/modules/Module1Content_Maximal";
// Temporarily commenting out other modules until their exports are verified
// import { contentDataModule2Maximalist } from "../pages/modules/Module2Detail";
// import { contentDataModule3Maximal } from "../pages/modules/Module3Detail";
// import { contentDataModule4Maximalist } from "../pages/modules/Module4Detail";
// import { contentDataModule5Maximalist } from "../pages/modules/Module5Detail";

export const testAllModules = () => {
  //
  //
  //
  //
  
  return {
    m1: !!contentDataModule1Maximalist,
    m2: "unchecked", // !!contentDataModule2Maximalist,
    m3: "unchecked", // !!contentDataModule3Maximal,
    m4: "unchecked", // !!contentDataModule4Maximalist,
    m5: "unchecked", // !!contentDataModule5Maximalist
  };
};
