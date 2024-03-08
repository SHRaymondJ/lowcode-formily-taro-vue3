import { ICustomEvent } from '@/design/shared/src'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class DragNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'drag:node'
}
