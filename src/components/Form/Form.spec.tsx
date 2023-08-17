import { render, screen } from '~/utils/test-utils'
import { Form } from '.'

describe('Form Component', () => {
  const wrapperID = 'form-wrapper'
  const colID = 'colID'
  const rowID = 'rowID'

  it('should render correctly Form.Wrapper', () => {
    render(<Form.Wrapper testID={wrapperID} />)

    expect(screen.getByTestId(wrapperID).props.style).toMatchSnapshot('wrapper')
  })

  it('should render correctly Form.Col default sm', () => {
    render(<Form.Col testID={colID} />)

    expect(screen.getByTestId(colID).props.style).toMatchSnapshot('col-sm')
  })
  it('should render correctly Form.Col md', () => {
    render(<Form.Col variant="md" testID={colID} />)

    expect(screen.getByTestId(colID).props.style).toMatchSnapshot('col-md')
  })
  it('should render correctly Form.Row md', () => {
    render(<Form.Row variant="md" testID={rowID} />)

    expect(screen.getByTestId(rowID).props.style).toMatchSnapshot('row-md')
  })

  it('should render correctly Form.Row lg', () => {
    render(<Form.Row variant="lg" testID={rowID} />)

    expect(screen.getByTestId(rowID).props.style).toMatchSnapshot('row-lg')
  })

  it('should render correctly Form.Label', () => {
    const text = 'Some Text'
    render(<Form.Label testID={rowID}>{text} </Form.Label>)
    const { size, weight } = screen.getByText(text).props
    expect({ size, weight }).toEqual({ size: 'md', weight: 'bold' })
  })
})
