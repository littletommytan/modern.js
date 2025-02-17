import {
  createParallelWorkflow,
  createAsyncWaterfall,
} from '@modern-js/plugin';
import type { QuestionCollection } from '@modern-js/utils/compiled/inquirer';
import type { DevToolData, PromptResult } from '../types/hooks';

export const devHooks = {
  registerDev: createParallelWorkflow<void, DevToolData>(),
  beforeDev: createParallelWorkflow<DevToolData[], void>(),
  beforeDevMenu: createAsyncWaterfall<QuestionCollection>(),
  afterDevMenu: createParallelWorkflow<
    { result: PromptResult; devTools: DevToolData[] },
    void
  >(),
  beforeDevTask: createParallelWorkflow<DevToolData, void>(),
  afterDev: createParallelWorkflow<void, void>(),
};
