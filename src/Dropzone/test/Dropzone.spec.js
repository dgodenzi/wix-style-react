import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import Dropzone from '../Dropzone';
import { dropzonePrivateDriverFactory } from './Dropzone.private.uni.driver';

const dropzoneWithStub = stub => (
  <Dropzone onDrop={stub}>
    <Dropzone.Overlay>
      <span />
    </Dropzone.Overlay>
    <Dropzone.Content>
      <span />
    </Dropzone.Content>
  </Dropzone>
);

describe(Dropzone.displayName, () => {
  const someFiles = [
    new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    }),
  ];

  const render = createRendererWithUniDriver(dropzonePrivateDriverFactory);

  let driver, onDropStub;
  beforeEach(() => {
    onDropStub = jest.fn();

    driver = render(dropzoneWithStub(onDropStub)).driver;
  });

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    expect(await driver.exists()).toBe(true);
    expect(await driver.getContentElement().exists()).toBe(true);
    expect(await driver.getOverlayElement().exists()).toBe(false);
  });

  it('should call onDrop when drop event happens and it has files', async () => {
    await driver.dropFiles(someFiles);

    expect(onDropStub).toHaveBeenCalledWith(someFiles);
  });

  it("should not call onDrop when drop event happens and it doesn't has files", async () => {
    await driver.dropFiles([]);

    expect(onDropStub).not.toHaveBeenCalled();
  });

  it('should render the overlay when files are hovered on the dropzone', async () => {
    await driver.hover(someFiles);

    expect(await driver.getOverlayElement().exists()).toBe(true);
    expect(await driver.getContentElement().exists()).toBe(false);
  });

  it("should not render the overlay when hover event happens and it doesn't have files", async () => {
    await driver.hover([]);

    expect(await driver.getOverlayElement().exists()).toBe(false);
  });

  it('should unrender the overlay when files are unhovered on the dropzone', async () => {
    await driver.hover(someFiles);
    expect(await driver.getOverlayElement().exists()).toBe(true);

    await driver.unhover();
    expect(await driver.getOverlayElement().exists()).toBe(false);
  });

  it('should unrender the overlay when files are dropped on the dropzone', async () => {
    await driver.hover(someFiles);
    expect(await driver.getOverlayElement().exists()).toBe(true);

    await driver.dropFiles(someFiles);
    expect(await driver.getOverlayElement().exists()).toBe(false);
  });
});
