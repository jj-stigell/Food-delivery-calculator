import * as config from '../config/config'
import { Fee, WeeklyEvent } from '../types'
import { insideEvent, normalize, addSurcharge, addExtraItemFee, distanceFee } from './helpers'

let event: WeeklyEvent = config.rushHour
let itemSurcharge: Fee = config.itemSurcharge
let deliveryFeeBase: Fee = config.deliveryFeeBase
let deliveryExtended: Fee = config.deliveryExtended

afterEach(() => {
  event = config.rushHour
  itemSurcharge = config.itemSurcharge
  deliveryFeeBase = config.deliveryFeeBase
  deliveryExtended = config.deliveryExtended
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

    it('Return 100 when value higher than MAX', async () => {
      expect(normalize(101, 0, 100)).toBe(100)
    })

    it('Return 0 when value lower than MIN', async () => {
      expect(normalize(-1, 0, 100)).toBe(0)
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

  describe('Test addExtraItemFee function', () => {
    it('Return 0 when item count is lower than required for charging extra per item', async () => {
      expect(addExtraItemFee(itemSurcharge.limit - 1, itemSurcharge)).toBe(0)
    })

    it('Return extra fee for one item when item count is equal to the limit after which extra fee is charged', async () => {
      expect(addExtraItemFee(itemSurcharge.limit, itemSurcharge)).toBe(itemSurcharge.fee)
    })

    it('Return extra fee for 5 items when item count is 4 over the limit after which extra fee is charged', async () => {
      expect(addExtraItemFee(itemSurcharge.limit + 4, itemSurcharge)).toBe(itemSurcharge.fee * 5)
    })
  })

  describe('Test distanceFee function', () => {
    it('Return base delivery fee when distance is less than base fee distance limit', async () => {
      expect(distanceFee(deliveryFeeBase.limit - 1, deliveryFeeBase, deliveryExtended)).toBe(deliveryFeeBase.fee)
    })

    it('Return base delivery fee when distance is equal to base fee distance limit', async () => {
      expect(distanceFee(deliveryFeeBase.limit, deliveryFeeBase, deliveryExtended)).toBe(deliveryFeeBase.fee)
    })

    it('Return base delivery fee + 1 x extended delivery when distance over base limit, but less than extended limit when distance is over base limit', async () => {
      expect(distanceFee(deliveryFeeBase.limit + 1, deliveryFeeBase, deliveryExtended)).toBe(deliveryFeeBase.fee + deliveryExtended.fee)
    })

    it('Return base delivery fee + 1 x extended delivery when distance equal to extended limit', async () => {
      expect(distanceFee(deliveryFeeBase.limit + deliveryExtended.limit, deliveryFeeBase, deliveryExtended)).toBe(deliveryFeeBase.fee + deliveryExtended.fee)
    })

    it('Return base delivery fee + 2 x extended delivery when distance is one time over the extended limit', async () => {
      expect(distanceFee(deliveryFeeBase.limit + deliveryExtended.limit + 1, deliveryFeeBase, deliveryExtended)).toBe(deliveryFeeBase.fee + 2 * deliveryExtended.fee)
    })

    it('Return base delivery fee + 10 x extended delivery when distance is 9 times over the extended limit', async () => {
      expect(distanceFee(deliveryFeeBase.limit + deliveryExtended.limit * 9 + 1, deliveryFeeBase, deliveryExtended)).toBe(deliveryFeeBase.fee + 10 * deliveryExtended.fee)
    })
  })
})
