import _ from '@lodash';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { withFormsy } from 'formsy-react';
import React from 'react';

function SelectFormsy(props) {
	const importedProps = _.pick(props, [
		'autoWidth',
		'children',
		'classes',
		'displayEmpty',
		'input',
		'inputProps',
		'MenuProps',
		'multiple',
		'native',
		'onChange',
		'onClose',
		'onOpen',
		'open',
		'renderValue',
		'SelectDisplayProps',
		'value',
		'variant'
	]);

	// An error message is returned only if the component is invalid
	const { errorMessage, value } = props;

	function input() {
		switch (importedProps.variant) {
			case 'outlined':
				return <OutlinedInput style={{height: "37px"}}  labelWidth={props.label.length * 8} id={props.name} />;
			case 'filled':
				return <FilledInput style={{height: "37px"}}  id={props.name} />;
			default:
				return <Input  style={{height: "37px"}} id={props.name} />;
		}
	}

	function changeValue(event) {
		props.setValue(event.target.value);
		if (props.onChange) {
			props.onChange(event);
		}
	}

	return (
		<FormControl
			error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			className={props.className}
			variant={importedProps.variant}
		>
			{props.label && <InputLabel style={{margin: "-7px"}}  htmlFor={props.name}>{props.label}</InputLabel>}
			<Select {...importedProps} value={value} onChange={changeValue} input={input()} />
			{Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
		</FormControl>
	);
}

export default React.memo(withFormsy(SelectFormsy));
