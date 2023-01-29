import * as config from '../config/config'
import { WeeklyEvent } from '../types'
import { insideEvent, normalize, addSurcharge } from './helpers'

let event: WeeklyEvent = config.rushHour

afterEach(() => {
  event = config.rushHour
})

describe('Test helper functions', () => {
  describe('Test insideEvent function', () => {
    it('Return true, when date and time inside the event time period', async () => {
      // Time is exactly start time
      let deliveryDateAndTime: Date = new Date('2023-01-13T15:00')
      expect(insideEvent(deliveryDateAndTime, event)).toBeTruthy()

      // Time is between start and end time
      deliveryDateAndTime = new Date('2023-01-13T17:00')
      expect(insideEvent(deliveryDateAndTime, event)).toBeTruthy()

      // Time is exactly end time
      deliveryDateAndTime = new Date('2023-01-13T19:00')
      expect(insideEvent(deliveryDateAndTime, event)).toBeTruthy()
    })

    it('Return false, when date and time outside the event time period', async () => {
      // Time is just before start time
      let deliveryDateAndTime: Date = new Date('2023-01-13T14:59')
      expect(insideEvent(deliveryDateAndTime, event)).toBeFalsy()

      // Time is just after end time
      deliveryDateAndTime = new Date('2023-01-13T19:59')
      expect(insideEvent(deliveryDateAndTime, event)).toBeFalsy()
    })
  })

  describe('Test normalize function', () => {
    it('Return 0 when value is same as MIN', async () => {
      expect(normalize(23, 23, 123)).toBe(0)
    })

    it('Return 100 when value is same as MAX', async () => {
      expect(normalize(658, 347, 658)).toBe(100)
    })

    it('Return something between when value is between MIN and MAX', async () => {
      expect(normalize(467, 233, 658)).toBeCloseTo(55.05, 1)
    })

    it('Return error when value higher than MAX', async () => {
      function testError (): number {
        return normalize(101, 0, 100)
      }
      expect(testError).toThrowError('value must be between MIN and MAX')
    })

    it('Return error when value lower than MIN', async () => {
      function testError (): number {
        return normalize(-1, 0, 100)
      }
      expect(testError).toThrowError('value must be between MIN and MAX')
    })
  })

  describe('Test addSurcharge function', () => {
    it('Return 0 when cart value equal to surcharge limit', async () => {
      expect(addSurcharge(10, 10)).toBe(0)
      expect(addSurcharge(67, 67)).toBe(0)
      expect(addSurcharge(457, 457)).toBe(0)
      expect(addSurcharge(7456, 7456)).toBe(0)
    })

    it('Return 0 when cart value greater than surcharge limit', async () => {
      expect(addSurcharge(11, 10)).toBe(0)
      expect(addSurcharge(5748, 23)).toBe(0)
      expect(addSurcharge(236, 126)).toBe(0)
      expect(addSurcharge(349, 287)).toBe(0)
    })

    it('Return the difference when cart value lower than surcharge limit', async () => {
      expect(addSurcharge(6, 10)).toBe(4)
      expect(addSurcharge(1, 10)).toBe(9)
      expect(addSurcharge(4, 404)).toBe(400)
      expect(addSurcharge(60, 100)).toBe(40)
      expect(addSurcharge(124, 224)).toBe(100)
    })
  })
})
