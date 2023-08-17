import { render, screen } from '~/utils/test-utils'
import { ContentSection } from '.'

describe('ContentSection Component', () => {
  it('should render correctly', () => {
    render(<ContentSection testID="content" />)

    expect(screen.getByTestId('content').props.style).toMatchSnapshot()
  })
})
