import { newE2EPage } from '@stencil/core/testing';

describe('as-countdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<as-countdown></as-countdown>');
    const element = await page.find('as-countdown');
    expect(element).toHaveClass('hydrated');
  });

  it('renders empty state', async () => {
    const page = await newE2EPage();

    await page.setContent('<as-countdown></as-countdown>');
    const component = await page.find('as-countdown');
    console.log(component.innerHTML);
    expect(component).toEqualHtml(`<as-countdown class="hydrated"><section><div>0</div><label>Days</label></section><section><div>0</div><label>Hours</label></section><section><div>0</div><label>Minutes</label></section><section><div>0</div><label>Seconds</label></section></as-countdown>`);
  });
});
