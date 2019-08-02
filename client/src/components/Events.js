import React,{Component} from 'react';
import { ListGroup, Container, ListGroupItem, ListGroupItemHeading, ListGroupItemText,Button } from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';

class Events extends Component{
    state={
        items:[
            {   id:uuid(),name:'InterIIIT',details:'This is to elaborate'  }, 
            {   id:uuid(),name:'Prothymos',details:'This is to elaborate'  },
            {   id:uuid(),name:'CT-1 Results',details:'This is to elaborate'  } 
            
        ]
    }

    render(){
        const {items} = this.state;
        return(
            <Container>
                <br/>
                <Button  color="secondary"
                  
                    onClick = {()=>{
                        const name = prompt('Enter Item');
                        if(name){
                            const details = prompt('Enter Details');
                        
                            this.setState(state=>({
                                items:[...state.items,{id:uuid(),name,details}]

                            }));
                        }
                    }}
>Add Item
                </Button>
<br/><br/>

                <ListGroup>
                    <TransitionGroup className="item-list">
                        {items.map(({id,name,details})=>(
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem  href="/">
                                    <ListGroupItemHeading>{name}</ListGroupItemHeading>
                                         <ListGroupItemText>{details}</ListGroupItemText>
                                </ListGroupItem>
        

                            </CSSTransition>
                        )
                        )}




                    </TransitionGroup>

      </ListGroup>
            </Container>
        );
    }





}
export default Events;