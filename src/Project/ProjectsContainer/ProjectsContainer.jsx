import  React ,{Component} from 'react';
import ProjectBox from './ProjectBox/ProjectBox';
import { Col, Container, Row , Dropdown } from 'react-bootstrap';
import { years , types , Countries} from '../../../static/constant';
import './ProjectContainer.css';
import { BsPlus } from 'react-icons/bs';
class ProjectContainer extends Component{
    state ={
        projects:''
    }
    componentDidMount(){
        const apiProjects = [
            {
                id:'dasdasdfeart43tgw34',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            {
                id:'',
                cover:'',
                name:'',
                category:'',
                types:[],
                owner_id:''
            },
            
        ] ;
        this.setState({projects:apiProjects});
    }
    render(){
        let projectsContainer ;
        if(this.state.projects){
        // eslint-disable-next-line array-callback-return
        projectsContainer = this.state.projects.map((project,index) => {
            console.log(index);
            return(
                <Col xs={12} sm={12} md={12} lg={4} xl={4} className="h-100 px-3 my-3" key={index}>
                    <ProjectBox />
                </Col>
            );
        }) 
        }else{
            projectsContainer  = null;
        }

        console.log(projectsContainer);
        const projectTypes = types.map((type,index)=>{
            return <li className={`d-inline-block mx-3 ${index === 0 ? 'active':null}`} key={index}>{type}</li>;
        }); 
        const projectyears = years.map((year)=>(<Dropdown.Item as="button" key={year}>{year}</Dropdown.Item>));
        const projecttypes = types.map((type)=>(<Dropdown.Item as="button" key={type}>{type}</Dropdown.Item>));
        const projectcountries = Countries.all.map((country,index)=>(<Dropdown.Item as="button" key={index}>{country.name}</Dropdown.Item>));

        return (
            <React.Fragment>
                    <div className="w-100 bg-white ">
                        <Container className="mt-5 mx-5 m-auto project-filter-panel-container">
                            <div className="project-filter-panel p-2 py-3 d-flex justify-content-around align-items-center">
                                <div className="project-filter-country-year">
                                    <ul className="list-unstyled mb-0">
                                        <li className="d-inline-block mx-3 active"> 
                                            <Dropdown>
                                                <Dropdown.Toggle  variant="white" style={{boxShadow:'none'}}>
                                                    Year
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu style={{minWidth:'95px',maxHeight:'250px',overflow:'auto',maxWidth:'200px',height:'auto'}}>
                                                {projectyears}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                        <li className="d-inline-block mx-3 active"> 
                                            <Dropdown>
                                                <Dropdown.Toggle variant="white" style={{boxShadow:'none'}} >
                                                    Country
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu style={{minWidth:'95px',maxHeight:'250px',overflow:'auto',maxWidth:'200px',height:'auto'}}>
                                                    {projectcountries}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    </ul>
                                </div>
                                <span className="v-line none-mobile"></span>
                                <div className="project-filter-types">
                                    <ul className="list-unstyled mb-0 none-mobile">
                                        {projectTypes}
                                    </ul>
                                    <ul className="list-unstyled mb-0 none-descktop">
                                        <li className="d-inline-block mx-3 active"> 
                                            <Dropdown>
                                                <Dropdown.Toggle variant="white" style={{boxShadow:'none'}}>
                                                    Type
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu style={{minWidth:'95px',maxHeight:'250px',overflow:'auto',maxWidth:'200px',height:'auto'}}>
                                                    {projecttypes}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    </ul>
                                </div>
                                <span className="v-line none-mobile"></span>
                                <div className="project-filter-creators">
                                    <ul className="list-unstyled mb-0 none-mobile">
                                        <li className="d-inline-block mx-3 active"> All </li>
                                        <li className="d-inline-block mx-3"> 17 Editors </li>
                                        <li className="d-inline-block mx-3"> Designers </li>
                                        <li className="d-inline-block mx-3"> Brands </li>
                                        <li className="d-inline-block mx-3"> Following </li>
                                    </ul>
                                    <ul className="list-unstyled mb-0 none-descktop">
                                        <li className="d-inline-block mx-3 active"> 
                                            <Dropdown>
                                                <Dropdown.Toggle variant="white" style={{boxShadow:'none'}}>
                                                    Creator
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu style={{minWidth:'95px',maxHeight:'250px',overflow:'auto',maxWidth:'200px',height:'auto'}}>
                                                    <Dropdown.Item as="button" key={'17-Editors'}>17 Editors</Dropdown.Item>
                                                    <Dropdown.Item as="button" key={'Designers'}>Designers</Dropdown.Item>
                                                    <Dropdown.Item as="button" key={'Brands'}>Brands</Dropdown.Item>
                                                    <Dropdown.Item as="button" key={'Following'}>Following</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Container>
                    </div>
                <Container className="mt-5 mx-5 m-auto">
                    <Row>
                        {projectsContainer}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}



export default ProjectContainer;