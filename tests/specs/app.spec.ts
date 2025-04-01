import { test, expect, beforeAll, afterAll } from '../fixtures.mts'

test.beforeAll(beforeAll)
test.afterAll(afterAll)

test('Document element check', async ({ page, util }) => {
  try {
    await expect(
      page.getByTestId('main-menu').first(),
      `Confirm main logo is visible`
    ).toBeVisible()
    await expect(
      page.getByTestId('select-language').first(),
      `Confirm language selector is visible`
    ).toBeVisible()

    await util.captureScreenshot(page, 'result')
  } catch (error) {
    throw await util.onTestError(error)
  }
})

test('Counter button click check', async ({ page, util }) => {
  try {
    await page.getByTestId('btn-menu-mcp').click({ clickCount: 2, delay: 50 })

    await page.getByTestId('btn-menu-chat').click({ clickCount: 2, delay: 50 })

    await page.getByTestId('btn-menu-setting').click({ clickCount: 2, delay: 50 })

    // const counterValueElement = await page
    //   .getByTestId('counter-badge')
    //   .getByRole('status')
    //   .innerHTML()

    // expect(counterValueElement).toBe('10')
  } catch (error) {
    throw await util.onTestError(error)
  }
})
