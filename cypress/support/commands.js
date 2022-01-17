import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
  'setSlider',
  { prevSubject: 'element' },
  (subject, value) => {
    const key = Object.keys(subject.get(0)).find((k) =>
      k.startsWith('__reactFiber$'),
    );
    const fiberNode = subject.prop(key);

    fiberNode.return.memoizedProps.ownerState.onChange(null, value);
    return subject;
  },
);
