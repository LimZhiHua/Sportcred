import FloatingSection from "../customComponents/FloatingSection";
import {BasicTextArea} from "../customComponents/inputFields/inputFields";
import {DefaultButton} from "../customComponents/buttons/Buttons"
import Card from "../customComponents/card/Card";
import SliderComponent from "../customComponents/slider/SliderComponent";




const AnswerCard = () => {

}


const AnalysisRate = () => {
  return (
    <>
      <FloatingSection>
        <h1>Today's Answers</h1>
        <br></br>
        <h3>Q: What is life?</h3>
        <br></br>
        <br></br>
        <Card style={{display : 'flex'}}>
          <h4>A: I dont know...</h4>
          <SliderComponent >
          </SliderComponent>
        </Card>
        <br></br>
        <br></br>
        <Card style={{display : 'flex'}}>
          <h4>A: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</h4>
          <SliderComponent>
          </SliderComponent>
        </Card>
        <DefaultButton style={{ 'background-color': "#FF652F"}}label= {"SUBMIT"} />
      </FloatingSection>
    </>
  )
}


export default AnalysisRate;