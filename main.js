import OBR from "@owlbear-rodeo/sdk";

const KEY_IS_MONSTER = "com.battle-system.clash/clash_isMonster";

async function markSelectionAsMonsters() {
  const ids = await OBR.player.getSelection(); // :contentReference[oaicite:2]{index=2}
  if (!ids?.length) {
    console.log("[ClashMonsterHotkey] No selection");
    return;
  }

  const items = await OBR.scene.items.getItems(ids); // :contentReference[oaicite:3]{index=3}
  if (!items.length) return;

  await OBR.scene.items.updateItems(items, (drafts) => { // :contentReference[oaicite:4]{index=4}
    for (const it of drafts) {
      it.metadata = it.metadata || {};
      it.metadata[KEY_IS_MONSTER] = true;
    }
  });

  console.log("[ClashMonsterHotkey] Marked monsters:", items.map((i) => i.id));
}

OBR.onReady(async () => {
  // Tool Action справа в тулбаре + хоткей "C" :contentReference[oaicite:5]{index=5}
  await OBR.tool.createAction({
    id: "clash-monster-hotkey.mark",
    shortcut: "C",
    icons: [{ icon: "/icon.svg", label: "Mark Monsters (C)" }],
    onClick: () => markSelectionAsMonsters(),
  });

  console.log("[ClashMonsterHotkey] Ready. Select tokens and press C.");
});
