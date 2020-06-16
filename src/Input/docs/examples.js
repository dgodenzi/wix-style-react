export const standard = `
<Layout>
  <Cell>
    <Input />
  </Cell>
  <Cell>
    <Input forceHover />
  </Cell>
  <Cell>
    <Input forceFocus />
  </Cell>
</Layout>
`;

export const withCloseButton = `
class MyComponent extends React.Component {
  state = {
    firstInputText: '',
    secondInputText: '',
    thirdInputText: '',
  };

  render() {
    const {
      firstInputText,
      secondInputText,
      thirdInputText
    } = this.state;

    return (
      <Layout>
        <Cell>
          <Input
            size="small"
            value={firstInputText}
            clearButton={true}
            onChange={e => {
              this.setState({ firstInputText: e.target.value })
            }}
            onClear={() => {
              this.setState({ firstInputText: '' })
            }}
           />
        </Cell>
        <Cell>
          <Input
              value={secondInputText}
              clearButton={true}
              onChange={e => {
                this.setState({ secondInputText: e.target.value })
              }}
              onClear={() => {
                this.setState({ secondInputText: '' })
              }}
            />
        </Cell>
        <Cell>
          <Input
            size="large"
            value={thirdInputText}
            clearButton={true}
            onChange={e => {
              this.setState({ thirdInputText: e.target.value })
            }}
            onClear={() => {
              this.setState({ thirdInputText: '' })
            }}
          />
        </Cell>
      </Layout>
    );
  }
}
`;

export const readOnly = `
<Layout>
  <Cell>
    <Input readOnly value="Read Only Input"/>
  </Cell>
</Layout>
`;

export const error = `
<Layout>
  <Cell>
    <Input status="error"/>
  </Cell>
  <Cell>
    <Input status="error" forceHover />
  </Cell>
  <Cell>
    <Input status="error" forceFocus />
  </Cell>
</Layout>
`;

export const warning = `
<Layout>
  <Cell>
    <Input status="warning"/>
  </Cell>
  <Cell>
    <Input status="warning" forceHover />
  </Cell>
  <Cell>
    <Input status="warning" forceFocus />
  </Cell>
</Layout>
`;

export const loader = `
<Layout>
  <Cell>
    <Input status="loading" />
  </Cell>
  <Cell>
    <Input status="loading" statusMessage="Loading some data..." />
  </Cell>
</Layout>
`;

export const affix = `
<Layout>
  <Cell>
    <Input prefix={<Input.Affix>https://</Input.Affix>} />
  </Cell>
  <Cell>
    <Input suffix={<Input.Affix>$</Input.Affix>} />
  </Cell>
  <Cell>
    <Input
      prefix={<Input.Affix>https://</Input.Affix>}
      suffix={<Input.Affix>.com</Input.Affix>}
    />
  </Cell>
  <Cell>
    <Input
      prefix={<Input.Affix>@</Input.Affix>}
      suffix={<Input.Affix>$</Input.Affix>}
      status="error"
    />
  </Cell>
</Layout>
`;

export const iconAffix = `
<Layout>
  <Cell>
    <Input
    size="small"
      prefix={
        <Input.IconAffix>
          <Icons.DateSmall />
        </Input.IconAffix>
      }
    />
  </Cell>
  <Cell>
    <Input
      size="small"
      suffix={
        <Input.IconAffix>
          <Icons.SearchSmall />
        </Input.IconAffix>
      }
    />
  </Cell>
  <Cell>
    <Input
      prefix={
        <Input.IconAffix>
          <Icons.Date />
        </Input.IconAffix>
      }
      suffix={
        <Input.IconAffix>
          <Icons.Search />
        </Input.IconAffix>
      }
    />
  </Cell>
  <Cell>
    <Input
      size="large"
      prefix={
        <Input.IconAffix>
          <Icons.ChevronRightLarge/>
        </Input.IconAffix>
      }
      suffix={
        <Input.IconAffix>
          <Icons.ChevronRightLarge/>
        </Input.IconAffix>
      }
      status="error"
    />
  </Cell>
</Layout>
`;

export const sizes = `
<Layout>
  <Cell>
    <Input
      size="small"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
  <Cell>
    <Input
      size="normal"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
  <Cell>
    <Input
      size="large"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
</Layout>
`;

export const rounded = `
<Layout>
  <Cell>
    <Input
      size="small"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput />
  </Cell>
  <Cell>
    <Input
      size="normal"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput
    />
  </Cell>
  <Cell>
    <Input
      size="large"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput
    />
  </Cell>
</Layout>`;
