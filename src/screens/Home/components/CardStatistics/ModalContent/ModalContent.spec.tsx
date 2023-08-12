import { render } from '~/utils/test-utils'
import { ModalContent } from '.'
import { mockStatistics } from '~/screens/Home/mockMeals'

describe('ModalContent Component', () => {
  it('should renderCorrectly', () => {
    render(
      <ModalContent statistics={mockStatistics} onRequestToClose={() => {}} />,
    )
  })
})
