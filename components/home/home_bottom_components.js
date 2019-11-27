import dynamic from 'next/dynamic';

const HomeBottomComponents = dynamic({
  modules: () => {
    const components = {
      CarLoan: import('./car_loan'),
      Testimonials: import('../testimonials'),
      FeaturedIn: import('../featured_in')
    }
    return components
  },
  render: (props, { CarLoan, Testimonials, FeaturedIn}) => {
    const testimonialUsers = [
      {
        "photo" : "goenka.png",
        "name" : "Mrs. Goenka",
        "profession" : "Satisfied buyer of Maruti WagonR",
        "comment" : "Extremely impressed with the services of truebil.com. Took only one visit to buy a used car for my family. Have been recommending Truebil to my neighbours and relatives."
      },
      {
        "photo" : "naeil.png",
        "name" : "Mr. Naeil",
        "profession" : "Happy seller of Hyundai i20",
        "comment" : "I sold my car in just seven days. The entire process was quick and simple. The inspection report eased communication between myself and buyers. Cheers to truebil team :)" 
      },
      {
        "photo" : "ganesh.png",
        "name" : "Mr. Ganesh",
        "profession" : "Hassle free owner of Swift Dzire",
        "comment" : "I am in awe of the services of truebil.com. Amazing concept with great details for every car. Would recommend every prospective buyer to buy cars through truebil." 
      }
    ];

    return (
    <div>
      <CarLoan userInfo={props.config.userInfo} />
      <Testimonials users={ testimonialUsers }/>
      <FeaturedIn cityInfo={props.config.cityInfo}/>
    </div>
  )}
})

export default HomeBottomComponents;