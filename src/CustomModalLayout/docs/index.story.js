import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  example as baseExample,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import BasicExample from '!raw-loader!./examples/BasicExample';
import FootnoteExample from '!raw-loader!./examples/FootnoteExample';
import ModalExample from '!raw-loader!./examples/ModalExample';
import PageExample from '!raw-loader!./examples/PageExample';
import TableExmaple from '!raw-loader!./examples/TableExample';
import MarketingExample from '!raw-loader!./examples/MarketingExample';
import CustomModalLayout from '..';
import Checkbox from '../../Checkbox';
import Text from '../../Text';
import Box from '../../Box';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: CustomModalLayout,
  componentPath: '..',

  componentProps: {
    title: 'Modal title',
    children: (
      <Box border={'1px dashed grey'} padding={2}>
        <Text>Your content goes here...</Text>
      </Box>
    ),
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    sideActions: <Checkbox>Check</Checkbox>,
    footnote: (
      <Text size="small">
        By sending an invite, you agree to the <a>Wix Terms of Use</a>
      </Text>
    ),
    onCloseButtonClick: () => {},
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new/choose',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/CustomModalLayout/',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'Use this component inside a <Modal /> to display content in this layout. You may place a title and/or a footer with actions relevant to the displayed content.',
            }),
          ]),

          columns([
            importExample(
              "import { CustomModalLayout } from 'wix-style-react';",
            ),
          ]),

          divider(),

          title('Examples'),

          example({
            title: 'Basic Usage',
            text: 'A Basic example with compact preview',
            source: BasicExample,
          }),
          example({
            title: 'Footnote Example',
            text: 'Same as the basic example, with the addition of a footnote',
            source: FootnoteExample,
          }),
          example({
            title: 'Opening in a modal',
            text:
              'Opening the CustomModalLayout is done with the Modal component, usually in the regular size of full-screen',
            source: ModalExample,
          }),
          example({
            title: 'Table example - No content padding',
            text:
              'A simple example with a table as the content and without content padding',
            source: TableExmaple,
          }),
          example({
            title: 'Marketing Layout example',
            text: 'A custom modal example with a marketing layout',
            source: MarketingExample,
          }),
          example({
            title: 'Custom Page Example',
            text: 'Open a custom page in a modal',
            source: PageExample,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
