import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {AnswerButton} from "../buttons/Buttons"

export function SimpleDropdown(props){
    let answerBox = <div></div>
    if(props.answerBox){
        answerBox = <AnswerButton style={{width: '100px', height: '10px'}} label='Select' onClick={props.onSelect}></AnswerButton> 
    }
        return(
            <div>
                <div>{props.boxTitle}</div>
                <FormControl variant="outlined" className={props.styles.formControl}>
                    <Select
                        id="demo-customized-select"
                        onChange={props.selected}
                        defaultValue={props.default}
                    >
                        {
                        props.values.map((item, index) => (
                        <MenuItem  key={index} value={item} style={{backgroundColor: 'grey', color: "white"}} >
                            <p style={{ color: 'white' }}> {item}</p> 
                        </MenuItem>
                        ))
                        }                       
                    </Select>
                    </FormControl>
                    <div>
                    {answerBox}
                    </div>
        </div>
        )
    

}
