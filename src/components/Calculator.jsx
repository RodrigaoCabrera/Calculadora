import React, {useState} from 'react';
import './style.css';

const Calculator = () => {
    const [view, setView] = useState('0');
    const [inputNumber, setInputNumber] = useState('');
    const [signo, setSigno] = useState('')
    const [result, setResult] = useState(null);
    const [operacion, setOperacion] = useState('');

    const mostrarEnPantalla = (e) => {
        setResult(null);
        if(result !== null){
            setView(e.target.value);
            if(e.target.value.includes('+') || e.target.value.includes('-') || e.target.value.includes('/') ||e.target.value.includes('x')){
                setOperacion(String(view).concat(e.target.value === 'x'?'*' : e.target.value));
            }else{
                setOperacion(e.target.value);
            }
        }else{
        if(e.target.value.includes('+') || e.target.value.includes('-') || e.target.value.includes('/') ||e.target.value.includes('x'))
        {
            if(signo.length === 0){
                setSigno(e.target.value === 'x' ? '*' : e.target.value);
                setOperacion(e.target.value === 'x' ? operacion.concat('*') : operacion.concat(e.target.value));
            }else if(e.target.value === '-' && signo.length === 1 && signo !== '-'){
                setSigno(signo + (e.target.value === 'x' ? '*' : e.target.value));
                setOperacion(e.target.value === 'x' ? operacion.concat('*') : operacion.concat(e.target.value));
            }else if(operacion.includes(signo) && signo.length === 2){
                setSigno(e.target.value === 'x' ? '*' : e.target.value);
                setOperacion(operacion.replace(signo, (e.target.value === 'x' ? '*': e.target.value)));
            }else if(signo.length >= 2){
                setSigno('');
                setOperacion(e.target.value === 'x' ? operacion.concat('*') : operacion.concat(e.target.value));
            }else{
                
                setOperacion(operacion.replace(signo, (e.target.value === 'x' ? '*': e.target.value)));
                setSigno('');
            }
            setInputNumber('');
            setView(e.target.value);
            
            
            
            
        }
            
            else if(e.target.value === '0' && view === '0'){
                setView('0');
                setOperacion('');
            }
            else if(e.target.value === '.' && view.includes('.') && operacion.includes('.')){
                return;
            }
        else{
            setInputNumber(inputNumber.concat(e.target.value));
            setView(inputNumber.concat(e.target.value));
            setOperacion(operacion.concat(e.target.value));
            setSigno('');
        }}
    }

    

    const realizarOperacion = () => {
        setInputNumber('');
        setSigno('');
        setResult(operacion + '=' + eval(operacion));
        setView(eval(operacion));
        
    }

    const numbers = [
        {
            'id':"divide",
            'value':"/"
        },
        {
            'id':"seven",
            'value':7
        },
        {
            'id':"eight",
            'value':8
        },
        {
            'id':"nine",
            'value':9
        },
        {
            'id':"multiply",
            'value':"x"
        },
        {
            'id':"four",
            'value':4
        },
        {
            'id':"five",
            'value':5
        },
        {
            'id':"six",
            'value':6
        },
        {
            'id':"add",
            'value':"+"
        },
        {
            'id':"one",
            'value':"1"
        },
        {
            'id':"two",
            'value':2
        },
        {
            'id':"three",
            'value':3
        },
        {
            'id':"subtract",
            'value':"-"
        },
        {
            'id':"zero",
            'value':0
        },
        {
            'id':"decimal",
            'value':"."
        }
    ];

    const numbersCalculator = numbers.map(numer => {
        return (
            <button 
                id={numer.id}
                value={numer.value} 
                onClick={mostrarEnPantalla}
            >
                {numer.value}
            </button>
        )
    })

    const handleDelete = (e) => {
        const action = e.target.name;
        if(!result && action === 'delete'){
            setView(view.slice(0, -1));
            setOperacion(operacion.slice(0, -1));
            setInputNumber(inputNumber.slice(0, -1))
        }else if(action === 'delete-all'){
            setView('0');
            setResult(null);
            setOperacion('');
            setInputNumber('');
            setSigno('');
        }
    }
    
    return (
        <div className="container">
            <div className="container-calculator">
                <section className="result">
                    {result !== null ? result : operacion}
                </section>
                <section className="view" id="display">
                    {view}
                </section>
                
                
                <section className="numbers">
                    <button  id="clear" className="delete-all" name="delete-all" onClick={handleDelete}>Delete All</button>
                    <button className="delete" name="delete" onClick={handleDelete}>Delete</button>
                    {numbersCalculator}
                    <button onClick={realizarOperacion} id="equals">=</button>
                </section>
            </div>    
        </div>
    )
}

export default Calculator
