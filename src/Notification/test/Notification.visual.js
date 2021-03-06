import { THEMES, ACTION_BUTTON_TYPES } from '../constants';
import React from 'react';
import { visualize, story, snap } from 'storybook-snapper';
import Notification from '..';

const themes = Object.values(THEMES);
const actions = Object.values(ACTION_BUTTON_TYPES);
const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.repeat(
  4,
);

const tests = [
  {
    describe: 'themes',
    its: themes.map(theme => ({
      it: theme,
      props: {
        theme,
        children: (
          <Notification.TextLabel>Notification Text</Notification.TextLabel>
        ),
      },
    })),
  },
  {
    describe: 'actions',
    its: actions.map(action => ({
      it: action,
      props: {
        children: [
          <Notification.ActionButton type={action} onClick={() => null}>
            {action}
          </Notification.ActionButton>,
          <Notification.TextLabel>Notification Text</Notification.TextLabel>,
        ],
      },
    })),
  },
  {
    describe: 'close button',
    its: [
      {
        it: 'exists',
        props: {
          children: [
            <Notification.TextLabel>Notification Text</Notification.TextLabel>,
            <Notification.CloseButton />,
          ],
        },
      },
      {
        it: 'does not exist',
        props: {
          children: (
            <Notification.TextLabel>Notification Text</Notification.TextLabel>
          ),
        },
      },
    ],
  },
  {
    describe: 'text label ellipsis',
    its: [
      {
        it: 'exists',
        props: {
          theme: 'error',
          children: [
            <Notification.TextLabel>{longText}</Notification.TextLabel>,
            <Notification.ActionButton onClick={() => null}>
              button
            </Notification.ActionButton>,
            <Notification.CloseButton />,
          ],
        },
      },
      {
        it: 'does not exist',
        props: {
          theme: 'error',
          children: [
            <Notification.TextLabel ellipsis={false}>
              {longText}
            </Notification.TextLabel>,
            <Notification.ActionButton onClick={() => null}>
              button
            </Notification.ActionButton>,
            <Notification.CloseButton />,
          ],
        },
      },
    ],
  },
];

visualize('Notification', () => {
  tests.forEach(({ describe, its }) => {
    its.forEach(({ it, props }) => {
      story(describe, () => {
        snap(it, () => <Notification show {...props} />);
      });
    });
  });
});
