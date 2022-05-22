package com.zonesoft.addressbook.entities;

import java.util.Date;

public class DummyEntity {
	private String name;
    private int valueA;
    private int valueB;
    private Date valueC;

    public DummyEntity() {
    }

    public DummyEntity(String name, int valueA, int valueB, Date valueC) {
    	this.setName(name);
        this.valueA = valueA;
        this.valueB = valueB;
        this.valueC = valueC;
    }
    
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    public int getvalueA() {
        return valueA;
    }

    public void setvalueA(int valueA) {
        this.valueA = valueA;
    }

    public Date getvalueC() {
        return valueC;
    }

    public void setvalueC(Date valueC) {
        this.valueC = valueC;
    }

    public int getvalueB() {
        return valueB;
    }

    public void setvalueB(int valueB) {
        this.valueB = valueB;
    }


}
