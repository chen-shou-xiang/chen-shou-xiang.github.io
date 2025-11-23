import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

const demoNote = defineNoteConfig({
  dir: "demo",
  link: "/demo",
  sidebar: ["", "foo", "bar"],
});
const tools = defineNoteConfig({
  dir: "tools",
  link: "/tools",
  sidebar: ["", "git", "npm"],
});

// const java = defineNoteConfig({
//   dir: "java",
//   link: "/java",
//   sidebar: ["", "juc/", "jvm/"],
// });
const jvm = defineNoteConfig({
  dir: "java/jvm",
  link: "/java/jvm",
  sidebar: ["","introduce/", "ClassTech/", "ClassLoader/", "MemoryStruc/", "GC/"],
});


const front = defineNoteConfig({
  dir: "front",
  link: "/front",
  sidebar: [""],
});

export const notes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [demoNote, tools, jvm, front],
});
