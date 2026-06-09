import React from 'react';

function About() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        padding: '30px 20px'
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {/* Heading */}
        <h1
          style={{
            textAlign: 'center',
            color: '#E63946',
            fontSize: '42px',
            marginBottom: '30px'
          }}
        >
          🍕 About PizzaHub
        </h1>

        {/* Story Section */}
        <div
          style={{
            background: '#f8f8f8',
            padding: '25px',
            borderRadius: '16px',
            marginBottom: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
          }}
        >
          <h2
            style={{
              color: '#E63946',
              marginBottom: '15px'
            }}
          >
            Our Story
          </h2>

          <p
            style={{
              color: '#555',
              lineHeight: '1.7',
              fontSize: '16px'
            }}
          >
            PizzaHub was created with one goal: serving delicious pizzas
            made from fresh ingredients and premium toppings. We believe
            every customer deserves hot, tasty pizza delivered quickly
            and prepared with care.
          </p>

          <p
            style={{
              color: '#555',
              lineHeight: '1.7',
              marginTop: '15px',
              fontSize: '16px'
            }}
          >
            From classic favorites to fully customized pizzas, PizzaHub
            brings quality, flavor, and convenience together. Whether
            you're a vegetarian, vegan, seafood lover, or someone who
            wants to build a unique pizza, we have something special for you.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ fontSize: '40px' }}>🍕</div>

            <h3
              style={{
                color: '#E63946',
                margin: '10px 0'
              }}
            >
              Fresh Ingredients
            </h3>

            <p style={{ color: '#666' }}>
              We use fresh vegetables, premium cheese, and quality toppings
              in every pizza.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ fontSize: '40px' }}>🚚</div>

            <h3
              style={{
                color: '#E63946',
                margin: '10px 0'
              }}
            >
              Fast Delivery
            </h3>

            <p style={{ color: '#666' }}>
              Your favorite pizzas are delivered hot and fresh right to
              your doorstep.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ fontSize: '40px' }}>🎨</div>

            <h3
              style={{
                color: '#E63946',
                margin: '10px 0'
              }}
            >
              Custom Pizza Builder
            </h3>

            <p style={{ color: '#666' }}>
              Create your dream pizza with a wide range of crusts,
              sauces, cheeses, and toppings.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div
          style={{
            background: '#f8f8f8',
            padding: '25px',
            borderRadius: '16px',
            marginTop: '30px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
          }}
        >
          <h2
            style={{
              color: '#E63946',
              marginBottom: '20px'
            }}
          >
            📞 Contact Us
          </h2>

          <p
            style={{
              color: '#555',
              marginBottom: '10px',
              fontSize: '16px'
            }}
          >
            📧 Email: support@pizzahub.com
          </p>

          <p
            style={{
              color: '#555',
              marginBottom: '10px',
              fontSize: '16px'
            }}
          >
            📱 Phone: +91 98765 43210
          </p>

          <p
            style={{
              color: '#555',
              marginBottom: '10px',
              fontSize: '16px'
            }}
          >
            📍 Chennai, Tamil Nadu, India
          </p>

          <p
            style={{
              color: '#777',
              marginTop: '15px'
            }}
          >
            We're available 24/7 to help you enjoy the best pizza experience! 🍕
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;