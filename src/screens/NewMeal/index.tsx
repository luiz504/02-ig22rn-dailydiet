import { FC, useMemo, useState } from 'react'
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { endOfDay, subMonths } from 'date-fns'

import { createMeal } from '~/storage/meals/createMeal'
import { getStatistics } from '~/storage/statistics/getStatistics'

import { formatDate, formatTime } from '~/utils/dateTimeFormatters'
import { isInDiet } from '~/utils/processMealsStatistics'

import { HeaderShort } from '~/components/HeaderShort'
import { Theme } from '~/components/Theme'
import { ContentSection } from '~/components/ContentSection'
import { Input } from '~/components/Input'
import { Form } from '~/components/Form'
import { Select } from '~/components/Select'
import { Button } from '~/components/Button'
import { DatePicker } from '~/components/DatePicker'

const newMealSchema = z.object({
  name: z.string().nonempty({ message: 'Meal name required.' }),
  description: z.string(),
  date: z
    .date()
    .min(subMonths(new Date(), 1))
    .max(endOfDay(new Date()), "Today's Date & time limit."),
  inDiet: z.boolean({ required_error: 'You must select a Diet type.' }),
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

      const statistics = await getStatistics()

      if (statistics) {
        navigator.dispatch(
          StackActions.replace('success-meal-creation', {
            inDiet: isInDiet(statistics.inDietPercentage),
          }),
        )
      } else {
        navigator.dispatch(StackActions.replace('home'))
      }
    } catch (err) {
      Alert.alert('Create Meal Error', 'Something went wrong :/, try again.')
    }
  }

  return (
    <Theme variant={'gray'}>
      <HeaderShort
        title="New meal"
        onReturnRequest={() => navigator.navigate('home')}
      />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ContentSection>
          <Form.Wrapper style={{ marginBottom: 32 }} testID="form">
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
                    onSubmitEditing={() => {
                      setFocus('description')
                    }}
                  />
                )}
              />
              {errors.name && (
                <Form.Error testID="name-error">
                  {errors.name.message}
                </Form.Error>
              )}
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
                  <DatePicker.Label numberOfLines={1} testID="label-date">
                    {dateTimeString.date}
                  </DatePicker.Label>
                </DatePicker.Button>
              </Form.Col>

              <Form.Col style={{ flex: 1 }}>
                <Form.Label>Hour</Form.Label>

                <DatePicker.Button
                  onPress={() => handleDateTimePickerModal('time')}
                  testID="btn-time"
                >
                  <DatePicker.Label numberOfLines={1} testID="label-time">
                    {dateTimeString.time}
                  </DatePicker.Label>
                </DatePicker.Button>
              </Form.Col>

              {errors.date && (
                <Form.Error testID="date-error">
                  {errors.date.message}
                </Form.Error>
              )}
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
                <Form.Error testID="in-diet-error">
                  {errors.inDiet.message}
                </Form.Error>
              )}
            </Form.Col>
          </Form.Wrapper>

          <Button
            style={{ marginTop: 'auto' }}
            label="Register meal"
            onPress={handleSubmit(handleCreateMeal)}
            disabled={isSubmitting}
            testID="btn-submit"
          />
        </ContentSection>
      </TouchableWithoutFeedback>
    </Theme>
  )
}
