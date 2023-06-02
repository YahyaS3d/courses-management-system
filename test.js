const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('/server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Courses API', () => {
  describe('POST /courses/create', () => {
    it('should create a new course', (done) => {
      const course = {
        courseID: 'CSCI101',
        courseName: 'Introduction to Computer Science',
        lecturer: 'John Doe',
        startDate: '2023-01-01',
        endDate: '2023-06-30',
      };

      chai.request(server)
        .post('/courses/create')
        .send(course)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Course created successfully');
          expect(res.body).to.have.property('course').to.deep.include(course);
          done();
        });
    });
  });
});
