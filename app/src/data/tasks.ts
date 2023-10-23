import fs from "fs";
import { parseArgs } from "util";
// Read in the file to persistently store tasks in
const {
  values: { file },
} = parseArgs({
  options: {
    file: {
      type: "string",
      short: "f",
      default: "./persistent_data.json",
    },
  },
});

type TaskStore = {
  tasks: string[];
};

const DEFAULT_TASKS: string[] = [
  "take the dog for a walk",
  "write a (bad) joke",
  "watch two movies AT THE SAME TIME",
  "bake only one cookie",
  "devestate the penguin military of the Antartic and rule a continent",
];

class PersistentList {
  mem_store: string[];
  file_path: string;

  constructor(file_path: string, default_value: string[]) {
    this.file_path = file_path;
    this.mem_store = [];
    // Check if file exists
    if (fs.existsSync(file_path)) {
      // Read in the file and set the mem_store to the contents
      console.log(
        "Found existing task file. Setting memory store to its contents..."
      );
      let existing_tasks: TaskStore = JSON.parse(
        fs.readFileSync(this.file_path, "utf8")
      );
      this.set(existing_tasks.tasks);
    } else {
      // If not, set mem_store to default and write file
      console.log("No existing task list found. Creating a new one...");
      this.set(default_value);
    }
  }

  set(new_array: string[]) {
    this.mem_store = new_array;
    this.flush();
  }

  flush() {
    let new_store: TaskStore = { tasks: this.mem_store };

    let store_json = JSON.stringify(new_store);
    fs.writeFileSync(this.file_path, store_json);
  }

  add(new_val: string) {
    console.log("Adding task: ", new_val);
    this.mem_store.push(new_val);
    this.set(this.mem_store);
  }
}

export let TASK_IDEAS = new PersistentList(file!, DEFAULT_TASKS);
