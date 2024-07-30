#!/usr/bin/env node
import { cac, Command } from 'cac'
import { CliError } from './error'
import process from 'node:process'


const useCommonCommands = (command: Command) => {

  command.option('-c, --command', 'LLM only return command')

  return command
}


async function main() {
  const cli = cac('shell-ai')

  // prompt command
  const root = cli.command('[...prompt]', 'Use shell AI prompt')

  useCommonCommands(root)

  cli.version(typeof PKG_VERSION === "string" ? PKG_VERSION : "0.0.0")
  cli.help()

  try {
    cli.parse(process.argv, { run: false })
    await cli.runMatchedCommand()
  } catch (error) {
    process.exitCode = 1
    if (error instanceof CliError) {
      console.error(error.message)
    } else {
      throw error
    }
  }
}

main()
