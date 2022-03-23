import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiSpies from "chai-spies";

use(chaiAsPromised);
use(chaiSpies);

(async () => {
  await import("./integration/users.test");
})();
