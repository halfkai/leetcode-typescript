import { watch } from "chokidar";
import { spawn } from "child_process";
import path from "path";

const ROOT = path.resolve(import.meta.dir, "..");

function runBuild(): Promise<void> {
  return new Promise((resolve) => {
    const proc = spawn("bun", ["run", "scripts/build.ts"], {
      cwd: ROOT,
      stdio: "inherit",
    });
    proc.on("close", () => resolve());
  });
}

async function main() {
  console.log("Starting dev mode...");
  await runBuild();

  const watcher = watch([path.join(ROOT, "problems"), path.join(ROOT, "public")], {
    ignoreInitial: true,
    persistent: true,
  });

  let building = false;
  let queued = false;

  async function rebuild() {
    if (building) {
      queued = true;
      return;
    }
    building = true;
    console.log("\n[dev] File changed, rebuilding...");
    await runBuild();
    building = false;
    if (queued) {
      queued = false;
      await rebuild();
    }
  }

  watcher.on("change", rebuild).on("add", rebuild).on("unlink", rebuild);

  console.log("\n[dev] Watching for changes. Ctrl+C to stop.");
  console.log(`[dev] Open dist/index.html in a browser or serve dist/ with a static server.\n`);
}

main();
