import { build as viteBuild } from "vite";
import { rm } from "fs/promises";
import { prerender } from "./prerender";

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("prerendering routes...");
  await prerender();

  console.log("static build complete.");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
