import { FC, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { endOfDay, subMonths } from 'date-fns'

import { formatDate, formatTime } from '~/utils/dataTimeFormatter'

import { HeaderShort } from '~/components/HeaderShort'
import { Theme } from '~/components/Theme'
import { ContentSection } from '~/components/ContentSection'
import { Input } from '~/components/Input'
import { Form } from '~/components/Form'
import { Select } from '~/components/Select'
import { Button } from '~/components/Button'
import { DatePicker } from '~/components/DatePicker'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createMeal } from '~/storage/meals/createMeal'

const newMealSchema = z.object({
  name: z.string().nonempty({ message: 'Meal name required.' }),
  description: z.string(),
  date: z
    .date()
    .min(subMonths(new Date(), 1))
    .max(endOfDay(new Date()), "Today's Date & time limit."),
  inDiet: z.boolean(),
})

type NewMealType = z.infer<typeof newMealSchema>

export const NewMeal: FC = () => {
  const navigator = useNavigation()

  const [isOpenDatePicker, setIsOpenDatePicker] = useState<
    'date' | 'time' | undefined
  >()

  const handleDateTimePickerModal = (mode?: 'date' | 'time') => {
    Keyboard.dismiss()

    setIsOpenDatePicker(mode)
  }

  const {
    control,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<NewMealType>({
    resolver: zodResolver(newMealSchema),
    defaultValues: {
      name: '',
      description: '',
      date: new Date(),
      inDiet: undefined,
    },
  })
  const dateTime = watch('date')

  const dateTimeString = useMemo(() => {
    const date = formatDate(dateTime)
    const time = formatTime(dateTime)

    return { date, time }
  }, [dateTime])

  const handleCreateMeal = async (data: NewMealType) => {
    try {
      await createMeal(data)
      navigator.navigate('home')
    } catch (err) {}
  }

  return (
    <Theme variant={'gray'}>
      <HeaderShort
        title="New meal"
        onReturnRequest={() => navigator.navigate('home')}
      />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ContentSection>
          <Form.Wrapper style={{ marginBottom: 32 }}>
            <Form.Col>
              <Form.Label>Name</Form.Label>

              <Controller
                name="name"
                control={control}
                render={({ field: { ref, onChange } }) => (
                  <Input
                    ref={ref}
                    onChangeText={onChange}
                    testID="input-name"
                    onSubmitEditing={() => setFocus('description')}
                  />
                )}
              />
              {errors.name && <Form.Error>{errors.name.message}</Form.Error>}
            </Form.Col>

            <Form.Col>
              <Form.Label>Description</Form.Label>
              <Controller
                name="description"
                control={control}
                render={({ field: { ref, onChange } }) => (
                  <Input
                    ref={ref}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    testID="input-description"
                  />
                )}
              />
            </Form.Col>

            <Form.Row variant="lg">
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange } }) => (
                  <DateTimePicker
                    isVisible={!!isOpenDatePicker}
                    mode={isOpenDatePicker}
                    onCancel={handleDateTimePickerModal}
                    onConfirm={(d) => {
                      onChange(d)
                      handleDateTimePickerModal()
                    }}
                    minimumDate={subMonths(new Date(), 1)}
                    // maximumDate={new Date()}
                    date={dateTime}
                    testID="date-time-picker"
                  />
                )}
              />

              <Form.Col style={{ flex: 1 }}>
                <Form.Label>Date</Form.Label>

                <DatePicker.Button
                  onPress={() => handleDateTimePickerModal('date')}
                  testID="btn-date"
                >
                  <DatePicker.Label numberOfLines={1}>
                    {dateTimeString.date}
                  </DatePicker.Label>
                </DatePicker.Button>
              </Form.Col>

              <Form.Col style={{ flex: 1 }}>
                <Form.Label>Hour</Form.Label>

                <DatePicker.Button
                  onPress={() => handleDateTimePickerModal('time')}
                  testID="btn-hour"
                >
                  <DatePicker.Label numberOfLines={1}>
                    {dateTimeString.time}
                  </DatePicker.Label>
                </DatePicker.Button>
              </Form.Col>

              {errors.date && <Form.Error>{errors.date.message}</Form.Error>}
            </Form.Row>

            <Form.Col variant="md">
              <Form.Label>Is it in Diet?</Form.Label>

              <Controller
                name="inDiet"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.Row variant="md">
                    <Select.Button
                      variant="green"
                      isSelected={!!value}
                      style={{ flex: 1 }}
                      onPress={() => onChange(true)}
                      testID={'btn-in-diet'}
                    >
                      <Select.Dot variant="green" />
                      <Select.Label>Yes</Select.Label>
                    </Select.Button>

                    <Select.Button
                      variant="red"
                      isSelected={value === false}
                      style={{ flex: 1 }}
                      onPress={() => onChange(false)}
                      testID={'btn-out-diet'}
                    >
                      <Select.Dot variant="red" />
                      <Select.Label>No</Select.Label>
                    </Select.Button>
                  </Form.Row>
                )}
              />
              {errors.inDiet && (
                <Form.Error>{errors.inDiet.message}</Form.Error>
              )}
            </Form.Col>
          </Form.Wrapper>

          <Button
            style={{ marginTop: 'auto' }}
            label="Register meal"
            onPress={handleSubmit(handleCreateMeal)}
            disabled={isSubmitting}
          />
        </ContentSection>
      </TouchableWithoutFeedback>
    </Theme>
  )
}
