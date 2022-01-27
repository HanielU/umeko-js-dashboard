
import '../scss/main.scss';
import importedCommands from '../data/commands.json'
import useQuery from '../hooks/useQuery';
import { useState,useContext } from 'react';
import { GlobalAppContext } from '../contexts';
import { BiSearchAlt } from 'react-icons/bi';
import CommandInfo from '../components/CommandInfo';

function Commands() {

  const { navigate } = useContext(GlobalAppContext);

  const query = useQuery();

  const [filter,setFilter] = useState(query.get("filter") || '');

  const prefix = '?';

  const commands = importedCommands.commands.filter(function(command){

    if(!filter) return true;

    const filterToLow = filter.toLowerCase();

    return command.name.toLowerCase().includes(filterToLow) || command.description.toLowerCase().includes(filterToLow);
  });


  const commandsComponents = commands.map(function(command){
    command.syntax = command.syntax.replace(/{prefix}/gi, `${prefix}`);
    command.syntax = command.syntax.replace(/{name}/gi, `${command.name}`);
    return <CommandInfo info={command}/>;
  });

  function onSearchChange(event) {
    const currentUrlParams = query;
    const newFilter = event.target.value;

    currentUrlParams.set('filter', newFilter);

    navigate(window.location.pathname + "?" + currentUrlParams.toString(), { replace: true });
    setFilter(newFilter);
  }
  
  return (
    <section className='standard-page' id='Commands'>

       <div style={{'marginTop' : '10px'}} className="search-container" >
        <input id='search-input' type="text" placeholder="Search.." value={filter} onChange={onSearchChange}/>
        <BiSearchAlt/>
      </div>

      <div className='command-list'>
        {commandsComponents}
      </div>

    </section>
  );

}

export default Commands;
