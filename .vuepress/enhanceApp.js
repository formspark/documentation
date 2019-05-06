import Lyticus from "lyticus";

export default ({ router }) => {
  if (typeof window !== "undefined") {
    const lyticus = new Lyticus("Cxd-1LCX8Lzbe_KSuk0Yy", {
      development: process.env.NODE_ENV === "development"
    });
    router.afterEach(to => {
      lyticus.trackPage(to.fullPath);
    });
  }
};
