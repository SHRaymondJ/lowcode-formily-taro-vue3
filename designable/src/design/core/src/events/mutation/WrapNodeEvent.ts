import { ICustomEvent } from '@/design/shared/src'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class WrapNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'wrap:node'
}
