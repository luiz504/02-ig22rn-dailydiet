import { fireEvent, render, screen } from '~/utils/test-utils'
import { AlertDelete } from '.'

describe('AlertDelete Component', () => {
  it('should render correctly', () => {
    render(<AlertDelete show onDismiss={() => {}} onConfirm={() => {}} />)

    const modalElement = screen.getByTestId('alert-delete-modal')
    const { transparent, animationType } = modalElement.props
    const overlayElement = screen.getByTestId('alert-delete-overlay')
    const content = screen.getByTestId('alert-delete-content')
    const heading = screen.getByTestId('alert-delete-heading')
    const btsRow = screen.getByTestId('alert-delete-btns-row')
    const btnDismiss = screen.getByTestId('alert-delete-btn-dismiss')
    const btnConfirm = screen.getByTestId('alert-delete-btn-confirm')

    // Assert
    expect(modalElement).toBeVisible()
    expect({ transparent, animationType }).toEqual({
      transparent: true,
      animationType: 'fade',
    })

    expect(overlayElement.props.style).toMatchSnapshot('overlay')
    expect(content.props.style).toMatchSnapshot('content')

    expect({
      style: heading.props.style,
      text: heading.props.children,
    }).toMatchSnapshot('heading')

    expect(btsRow.props.style).toMatchSnapshot('btns-row')
    expect(btnDismiss.props.style).toMatchSnapshot('btn-dismiss')
    expect(btnDismiss).toHaveTextContent('Cancel')
    expect(btnConfirm.props.style).toMatchSnapshot('btn-confirm')
    expect(btnConfirm).toHaveTextContent('Yes, delete')
  })

  it('should trigger callbacks passed by props correctly', () => {
    const onDismiss = jest.fn()
    const onConfirm = jest.fn()

    render(<AlertDelete show onDismiss={onDismiss} onConfirm={onConfirm} />)

    const btnDismiss = screen.getByTestId('alert-delete-btn-dismiss')
    const btnConfirm = screen.getByTestId('alert-delete-btn-confirm')

    // Act

    fireEvent.press(btnDismiss)

    // Asset
    expect(onDismiss).toBeCalledTimes(1)
    expect(onDismiss).toBeCalledWith()
    expect(onConfirm).toBeCalledTimes(0)

    //
    jest.clearAllMocks()

    // Act
    fireEvent.press(btnConfirm)

    expect(onDismiss).toBeCalledTimes(0)
    expect(onConfirm).toBeCalledTimes(1)
    expect(onConfirm).toBeCalledWith()
  })
})
