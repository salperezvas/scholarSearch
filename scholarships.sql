use scholarSearchDB;
-- Insert 30 sample scholarships into the Scholarships table
INSERT INTO Scholarships (title, description, amount, deadline, company_id, status)
VALUES
('STEM Scholars Program', 'Scholarship for students pursuing STEM majors.', 5000.00, '2025-06-01', 1, 'approved'),
('Future Leaders Grant', 'For students showing leadership in community initiatives.', 3000.00, '2025-07-15', 2, 'approved'),
('Women in Tech Award', 'Encourages women in computer science.', 4000.00, '2025-05-30', 1, 'approved'),
('First-Gen College Fund', 'Supports first-generation college students.', 3500.00, '2025-08-01', 3, 'approved'),
('Environmental Impact Grant', 'For students studying environmental science.', 4500.00, '2025-09-01', 4, 'approved'),
('Innovation in Business Award', 'Business majors with innovative project experience.', 2500.00, '2025-07-10', 5, 'approved'),
('Future Engineers Grant', 'Engineering students with financial need.', 3200.00, '2025-06-20', 6, 'approved'),
('Tech for Good Scholarship', 'Students applying technology to social issues.', 3800.00, '2025-08-15', 7, 'approved'),
('Arts & Design Merit Fund', 'For art and design students with strong portfolios.', 3000.00, '2025-07-25', 8, 'approved'),
('Health & Wellness Award', 'Public health and wellness program support.', 3600.00, '2025-09-05', 9, 'approved'),
('Underrepresented Voices Grant', 'Supports underrepresented student groups.', 4000.00, '2025-10-01', 10, 'approved'),
('Latinx in STEM Scholarship', 'STEM-focused support for Latinx students.', 5000.00, '2025-08-20', 2, 'approved'),
('AI & Robotics Award', 'For students researching AI and robotics.', 4200.00, '2025-07-01', 1, 'approved'),
('Veterans Education Fund', 'Educational aid for student veterans.', 2800.00, '2025-09-15', 3, 'approved'),
('Agriculture Future Grant', 'Scholarships for agricultural science majors.', 3100.00, '2025-10-10', 4, 'approved'),
('Cybersecurity Excellence Fund', 'Cybersecurity program students.', 3700.00, '2025-11-01', 5, 'approved'),
('LGBTQ+ Student Support Grant', 'For LGBTQ+ identifying students.', 3300.00, '2025-08-30', 6, 'approved'),
('Journalism and Media Scholarship', 'Aspiring journalists and media creators.', 2900.00, '2025-07-18', 7, 'approved'),
('Clean Energy Future Fund', 'Students working in clean energy.', 4600.00, '2025-09-25', 8, 'approved'),
('Minority Business Leaders Grant', 'Business majors from minority backgrounds.', 3400.00, '2025-10-15', 9, 'approved'),

-- 5 Pending Scholarships
('Green Tech Innovators', 'For students in green tech and innovation.', 4100.00, '2025-10-20', 1, 'pending'),
('Accessible Education Grant', 'Helping students with disabilities succeed.', 3700.00, '2025-11-05', 2, 'pending'),
('Rural Student Support Fund', 'Support for rural and small-town students.', 3200.00, '2025-11-15', 3, 'pending'),
('Women in Engineering Award', 'Encouraging women in engineering.', 3800.00, '2025-12-01', 4, 'pending'),
('Arts for Social Change Scholarship', 'Artists using art for activism.', 3500.00, '2025-12-10', 5, 'pending'),

-- 5 Denied Scholarships
('Tech Pioneers Fellowship', 'Fellowship for innovative tech students.', 4400.00, '2025-11-10', 6, 'denied'),
('Global Outreach Grant', 'Scholarship for students with international service.', 3900.00, '2025-10-30', 7, 'denied'),
('Low-Income Urban Support', 'Supporting urban students from low-income families.', 3000.00, '2025-12-15', 8, 'denied'),
('Digital Media Creators Fund', 'For creative digital media projects.', 3600.00, '2025-12-20', 9, 'denied'),
('Neurodivergent Student Support', 'Scholarships for neurodivergent learners.', 3400.00, '2025-12-25', 10, 'denied');