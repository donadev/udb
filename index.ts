import util from 'node:util';
import commands, { Platform } from './lib/commands';

const exec = util.promisify(require('node:child_process').exec);

const cli = async (commandMap: any, platform: Platform) => {
    const command = commandMap[platform]
    return (await exec(command))?.stdout?.trim()
}


/**
 * Captures a screenshot of the current screen on the specified platform.
 * @param destinationFile The file path where the screenshot will be saved.
 * @param platform The target platform (iOS or Android).
 * @returns A promise that resolves with the command output.
 */
export const screenshot = async (destinationFile: string, platform: Platform) => {
    return cli(commands.screenshot(destinationFile), platform)
}

/**
 * Terminates the specified app on the given platform.
 * @param appId The app identifier (bundle identifier for iOS, package ID for Android)
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with the command output
 */
export const terminateApp = async (appId: string, platform: Platform) => {
    return cli(commands.terminateApp(appId), platform)
}

/**
 * Starts the specified app on the given platform.
 * @param appId The app identifier (bundle identifier for iOS, package ID for Android)
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with the command output
 */
export const startApp = async (appId: string, platform: Platform) => {
    return cli(commands.startApp(appId), platform)
}

/**
 * Simulates a tap at the specified coordinates on the given platform.
 * @param x The x-coordinate of the tap
 * @param y The y-coordinate of the tap
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with the command output
 */
export const tap = async (x : number, y : number, platform: Platform) => {
    return cli(commands.tap(x, y), platform)
}

/**
 * Inputs the specified text on the given platform.
 * @param text The text to input
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with the command output
 */
export const input = async (text: string, platform: Platform) => {
    return cli(commands.input(text), platform)
}

/**
 * Retrieves the ID of the currently open simulator on the given platform.
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with the open simulator ID
 */
export const getOpenSimulatorId = async (platform: Platform) => {
    return cli(commands.getOpenSimulatorId(), platform)
}

/**
 * Checks if the specified simulator is booted on the given platform.
 * @param id The simulator ID to check
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with a boolean indicating if the simulator is booted
 */
export const isSimulatorBooted = async (id: string, platform: Platform) => {
    return await cli(commands.isSimulatorBooted(id), platform) == "true"
}

/**
 * Boots the specified simulator on the given platform.
 * @param id The simulator ID to boot
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with the command output
 */
export const bootSimulator = async (id: string, platform: Platform) => {
    return cli(commands.bootSimulator(id), platform)
}

/**
 * Connects to the specified simulator on the given platform.
 * @param id The simulator ID to connect to
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with the command output
 */
export const connectSimulator = async (id: string, platform: Platform) => {
    return cli(commands.connectSimulator(id), platform)
}

/**
 * Retrieves a list of available simulators on the given platform.
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with a list of available simulators
 */
export const getAvailableSimulators = async (platform: Platform) => {
    return cli(commands.getAvailableSimulators(), platform)
}

/**
 * Checks if the specified app is installed on the given platform.
 * @param appId The app identifier (bundle identifier for iOS, package ID for Android)
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with a boolean indicating if the app is installed
 */
export const isAppInstalled = async (appId: string, platform: Platform) => {
    return await cli(commands.isAppInstalled(appId), platform) == "true"
}

/**
 * Press a specific key given the keycode
 * @param code The code of the key to press
 * @param platform The target platform (iOS or Android)
 * @returns A promise that resolves with the command output
 */
export const pressKey = async (code: number, platform: Platform) => {
    return cli(commands.pressKey(code), platform)
}