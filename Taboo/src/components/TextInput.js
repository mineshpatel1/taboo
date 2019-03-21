import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Item, Input, Icon, Label, Button } from 'native-base';

export default function TextInput(_props) {
  const { input, meta, button, label, style, ...props } = _props;
  if (typeof(label) == 'string') {
    label = {text: label};
  }

  return (
    <Item style={style} error={meta.error}>
      {label &&
        <Label style={label.style}>{label.text}</Label>
      }
      <Input
        {...props}
        {...input}
        onChangeText={input.onChange}
      />
      {button &&
        <Button
          {...button}
          small rounded style={{marginTop: 7}}
        >
          <Icon name={button.icon} />
        </Button>
      }
      {meta.error && !props.hideIcon &&
        <Icon name='close-circle' />
      }
    </Item>
  )
}
