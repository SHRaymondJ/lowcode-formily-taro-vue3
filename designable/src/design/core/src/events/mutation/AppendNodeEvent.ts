import { ICustomEvent } from '@/design/shared/src'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class AppendNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'append:node'
}
