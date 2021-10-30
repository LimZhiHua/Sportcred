import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {AnswerButton} from "../buttons/Buttons"

export function SinglePlayerDropdown(props){
    return(
        <div>
        <div> {props.title}</div>
        <div className='component'>
           <div className='sub-component'>
                <div className='sub-sub'>
                    <div>{props.boxTitle}</div>
                    <FormControl variant="outlined" className={props.styles.formControl}>
                        <Select
                            id="demo-customized-select"
                            onChange={props.selected}
                            defaultValue={props.default}
                        >
                            <MenuItem  value={"Please Select a Player"} style={{backgroundColor: 'grey', color: "white"}} >
                                <p style={{ color: 'white' }}>Please Select a Player</p> 
                            </MenuItem>
                            {
                            props.values.map((item, index) => (
                            <MenuItem  key={item} value={item} style={{backgroundColor: 'grey', color: "white"}} >
                                <p style={{ color: 'white' }}> {item}</p> 
                            </MenuItem>
                            ))
                            }                       
                        </Select>
                        </FormControl>
                        <div>
                        <AnswerButton style={{width: '100px', height: '10px'}} label='Save' onClick={props.onSelect}></AnswerButton>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    )
}
