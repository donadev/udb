export type Platform = "ios" | "android"

type CommandMap = {
    [key in Platform]: string;
};

type CommandFunction<T extends any[]> = (...args: T) => CommandMap;

const commands: {
    [key: string]: CommandFunction<any[]>;
} = {
    screenshot: (name: string): CommandMap => ({
        ios: `xcrun simctl io booted screenshot ${name}`,
        android: `adb exec-out screencap -p > ${name}`
    }),
    terminateApp: (appId: string): CommandMap => ({
        ios: `idb terminate ${appId}`,
        android: `adb shell am force-stop ${appId}`
    }),
    startApp: (appId: string): CommandMap => ({
        ios: `idb launch ${appId}`,
        android: `adb shell monkey -p ${appId} -c android.intent.category.LAUNCHER 1`
    }),
    tap: (x: number, y: number): CommandMap => ({
        ios: `idb ui tap ${x} ${y}`,
        android: `adb shell input tap ${x} ${y}`
    }),
    input: (text: string): CommandMap => ({
        ios: `idb focus && cliclick t:"${text.replace(/"/g, '\\"')}"`,
        android: `adb shell input text $(echo '${text.replace(/'/g, "\\'")}' | sed 's/ /\%s/g')`
    }),
    getOpenSimulatorId: (): CommandMap => ({
        ios: "idb list-targets  | awk -F '[|()]' '/Booted/ {print $2}' | head -n 1",
        android: "adb devices | awk 'NR>1 {print $1}' | grep '^emulator-' | head -n 1"
    }),
    isSimulatorBooted: (id: string): CommandMap => ({
        ios: `if idb list-targets | grep ${id} | grep -q "Booted"; then echo true; else echo false; fi`,
        android: `adb shell getprop sys.boot_completed 2>/dev/null | grep -q '^1$' && echo true || echo false`
    }),
    bootSimulator: (id: string): CommandMap => ({
        ios: `idb kill && idb boot ${id} && idb connect ${id} && open -a Simulator`,
        android: `~/Library/Android/sdk/emulator/emulator -avd ${id} &`
    }),
    connectSimulator: (id: string): CommandMap => ({
        ios: `idb kill && idb connect ${id}`,
        android: "echo 'true';"
    }),
    getAvailableSimulators: (): CommandMap => ({
        ios: "idb list-targets | grep 'Shutdown' | sed -E 's/^(.*) (([A-F0-9-]+)) (Shutdown).*$/ ()/'",
        android: `emulator -list-avds | paste -sd, -`
    }),
    isAppInstalled: (appId: string): CommandMap => ({
        ios: `if idb list-apps | grep -q "${appId}"; then echo true; else echo false; fi`,
        android: `if adb shell pm list packages | grep -q "${appId}"; then echo true; else echo false; fi`
    }),
    pressKey: (code: number): CommandMap => {
        return {
            "ios": `idb ui key ${code}`,
            "android": `adb shell input keyevent ${code}`
        }
    },
};

export default commands;