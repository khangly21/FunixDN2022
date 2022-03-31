function Footer_ResponsiveGrid_CSSBootstrap5(props){
    
    return(
            <div className="container-fluid footerCSS">
                <div className="row justify-content-center">
                
                    <div className="col-sm-12 col-md-6 col-lg-4" style={{textAlign:'center'}}>
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Nhân viên</a></li>
                            <li><a href="#">Phòng ban</a></li>
                            <li><a href="#">Bảng lương</a></li>
                            
                        </ul>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-4" style={{textAlign:'center'}}>
                        <h5>Our Address</h5>
                        <address style={{color:'burlywood'}}>
         		            121, Clear Water Bay Road<br />
         		            Clear Water Bay, Kowloon<br />
         		            HONG KONG<br />
         		            <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
         		            <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
         		            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-4" style={{textAlign:'center'}}>
                        <h5>Media</h5>
                        <div className="text-center">
                            <div className="row justify-content-center">
                                <div className="col-12" style={{textAlign:'center'}}>
                                    <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12" style={{textAlign:'center'}}>
                                    <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12" style={{textAlign:'center'}}>
                                    <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12" style={{textAlign:'center'}}>
                                    <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12" style={{textAlign:'center'}}>
                                    <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12" style={{textAlign:'center'}}>
                                    <a className="btn btn-social-icon" href="mailto:"><i style={{backgroundColor:'yellow'}} className="fa fa-envelope-o" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12" style={{textAlign:'center',color:'white'}}>
                        <p> &copy; Copyright 2022 by Ly Viet Khang</p>
                    </div>
                </div>

                
                    
            
            </div>
    )
}