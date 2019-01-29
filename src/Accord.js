

class App extends Component {
  constructor() {
    super();

    this.state = {

    }}
    render() {
      return (
    <Accordion>
  <AccordionItem>
    <AccordionItemTitle>
      <RadioButtonComponent
        label="Mitchell Trubisky"
        name="position"
        labelPosition="Before"
      />
      <RadioButtonComponent
        label=""
        name="position"
        labelPosition="Before"
      />
    </AccordionItemTitle>
    <AccordionItemBody>
      <p>Replace</p>
      <p>Leave Blank</p>
    </AccordionItemBody>
  </AccordionItem>
  <AccordionItem>
    <AccordionItemTitle>
      <RadioButtonComponent
        label="Tarik Cohen"
        name="position"
        labelPosition="Before"
      />
      <RadioButtonComponent
        label=""
        name="position"
        labelPosition="Before"
      />
    </AccordionItemTitle>
    <AccordionItemBody>
      <p>Replace</p>
      <p>Leave Blank</p>
    </AccordionItemBody>
  </AccordionItem>
</Accordion>
)}

export default Accord;
