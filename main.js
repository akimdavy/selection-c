import OBR from "https://unpkg.com/@owlbear-rodeo/sdk/dist/index.mjs";

const CLASH_IS_MONSTER = "com.battle-system.clash/clash_isMonster";

OBR.onReady(async () => {
  // Кнопка/экшен в тулбаре + хоткей "C"
  await OBR.tool.createAction({
    id: "selection-c.mark-monster",
    shortcut: "C",
    icons: [
      {
        icon: "/icon.svg",
        label: "Mark as Monster (C)"
      }
    ],
    onClick: async () => {
      const ids = await OBR.player.getSelection();
      if (!ids?.length) return;

      // Важно: работает только если у тебя есть права на изменение токенов
      await OBR.scene.items.updateItems(ids, (items) => {
        for (const it of items) {
          it.metadata ??= {};
          it.metadata[CLASH_IS_MONSTER] = true;
        }
      });

      console.log("[selection-c] Marked as monsters:", ids);
    }
  });

  console.log('[selection-c] Ready. Press "C" to mark selected tokens as monsters.');
});
