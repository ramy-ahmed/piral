import { Argv, Arguments } from 'yargs';
import { RuleRunner, PiletRuleContext, PiralRuleContext } from './common';

export interface ToolCommandRunner<U> {
  (args: Arguments<U>): void | Promise<void>;
}

export interface ToolCommandWrapper<U> {
  (args: Arguments<U>, runner: ToolCommandRunner<U>): void | Promise<void>;
}

export interface ToolCommandFlagsSetter<T> {
  (argv: Argv<T>): Argv<T>;
}

export interface ToolCommand<T = any, U = any> {
  name: string;
  description: string;
  arguments: Array<string>;
  flags?: ToolCommandFlagsSetter<T>;
  alias: Array<string>;
  run: ToolCommandRunner<U>;
}

export interface ListCommands {
  all: Array<ToolCommand<any>>;
  pilet: Array<ToolCommand<any>>;
  piral: Array<ToolCommand<any>>;
}

export interface CliPluginApi {
  withCommand<T, U>(command: ToolCommand<T, U>): CliPluginApi;
  withoutCommand(commandName: string): CliPluginApi;
  withFlags<T>(commandName: string, setter: ToolCommandFlagsSetter<T>): CliPluginApi;
  wrapCommand<U>(commandName: string, wrapper: ToolCommandWrapper<U>): CliPluginApi;
  beforeCommand<U>(commandName: string, before: ToolCommandRunner<U>): CliPluginApi;
  afterCommand<U>(commandName: string, after: ToolCommandRunner<U>): CliPluginApi;
  withPiralRule(ruleName: string, runner: RuleRunner<PiralRuleContext>): CliPluginApi;
  withPiletRule(ruleName: string, runner: RuleRunner<PiletRuleContext>): CliPluginApi;
  withPatcher(packageName: string, patch: PackagePatcher): CliPluginApi;
}

export interface CliPlugin {
  (api: CliPluginApi): void;
}

export interface PackagePatcher {
  (rootDir: string): Promise<void>;
}
