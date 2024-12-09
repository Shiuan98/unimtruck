import React, { useState ,Component } from 'react';


  function Faq({faq, index, toggleFAQ}){

    return(
      <div className={"faqs " + (faq.open ? 'open' : '')} key={index} onClick={() => toggleFAQ(index)} >
      <h4 class="faq-question faq-heading">
        {faq.question}
      </h4>
      <p class="faq-answer faq-text read">
        {faq.answer}
      </p>
      </div>
      );
  }

  export default Faq;