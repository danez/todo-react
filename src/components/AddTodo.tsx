import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps } from 'redux-form'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { DispatchType } from '../store/utils'
import { addTodo } from "../store/";
import { compose } from 'redux';

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing.unit * 1,
    width: '100%',
    maxWidth: 400,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing.unit * 2,
    },
  },
  input: {
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 4,
    },
    flex: 1,
  },
  icon: {
    margin: theme.spacing.unit * 1,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing.unit * 2,
    },
  },
});

const mapDispatch = {
  addTodo,
}

interface FormData {
  text: string
}

type InputProps = WrappedFieldProps & WithStyles<typeof styles> & {
  placeholder: string
}

const AddInput: React.StatelessComponent<InputProps> = ({input, placeholder, classes}) => (
  <Input {...input} placeholder={placeholder} className={classes.input} />
)

export interface Props extends WithStyles<typeof styles>,
                               InjectedFormProps<FormData>,
                               DispatchType<typeof mapDispatch> {}

const AddTodoForm: React.SFC<Props> = ({ handleSubmit, classes, reset, addTodo }) => {
  const submit = (values: FormData) => {
    addTodo(values.text)
    reset()
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit(submit)}>
      <Field
        name="text"
        // Do not `.bind(this)` on below line: otherwise, will re-render and loose focus upon `onChange`
        component={AddInput}
        placeholder="Add New Todo &hellip;"
        classes={classes} 
        />
      <IconButton aria-label="Comments" className={classes.icon} type="submit">
        <Icon color="primary">
          add_circle
        </Icon>
      </IconButton>
    </form>
  )
}

export default compose(
  reduxForm({form: 'add'}),
  connect(null, mapDispatch),
  withStyles(styles),
)(AddTodoForm)
